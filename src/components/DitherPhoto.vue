<script setup>
// Renders a photo as true 1-bit black & white, via 4x4 ordered (Bayer)
// dithering on a canvas - a period-accurate 80s dot-matrix/print look,
// not a CSS grayscale filter standing in for one.
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  // Internal render width in pixels - lower = chunkier, more visible dots.
  renderWidth: { type: Number, default: 260 },
})

const canvasEl = ref(null)
const ready = ref(false)

const bayer4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

function draw(img) {
  const canvas = canvasEl.value
  if (!canvas) return

  const scale = props.renderWidth / img.width
  const w = props.renderWidth
  const h = Math.round(img.height * scale)
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h)
  const imageData = ctx.getImageData(0, 0, w, h)
  const data = imageData.data

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      const threshold = ((bayer4[y % 4][x % 4] + 0.5) / 16) * 255
      const v = gray > threshold ? 255 : 0
      data[i] = data[i + 1] = data[i + 2] = v
    }
  }

  ctx.putImageData(imageData, 0, 0)
  ready.value = true
}

onMounted(() => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => draw(img)
  img.src = props.src
})
</script>

<template>
  <div class="dither-wrap" :class="{ ready }">
    <canvas ref="canvasEl" role="img" :aria-label="alt"></canvas>
  </div>
</template>

<style scoped>
.dither-wrap {
  border: 1px solid var(--line);
  line-height: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.dither-wrap.ready { opacity: 1; }
canvas {
  width: 100%;
  height: auto;
  display: block;
  image-rendering: pixelated;
  filter: invert(0);
}
</style>
