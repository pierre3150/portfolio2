<script setup>
// Converts the photo to flat grayscale with a touch of extra contrast on a
// canvas, matching the site's black & white palette - no dot-matrix/halftone
// pattern, just a clean monochrome photo.
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  renderWidth: { type: Number, default: 520 },
})

const canvasEl = ref(null)
const ready = ref(false)

// Light S-curve around mid-gray so the photo stays punchy on a pure black
// background instead of reading as washed-out gray.
function contrast(v, amount = 24) {
  const factor = (259 * (amount + 255)) / (255 * (259 - amount))
  return Math.min(255, Math.max(0, factor * (v - 128) + 128))
}

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

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
    const v = contrast(gray)
    data[i] = data[i + 1] = data[i + 2] = v
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
  <div class="photo-wrap" :class="{ ready }">
    <canvas ref="canvasEl" role="img" :aria-label="alt"></canvas>
  </div>
</template>

<style scoped>
.photo-wrap {
  border: 1px solid var(--line);
  line-height: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.photo-wrap.ready { opacity: 1; }
canvas {
  width: 100%;
  height: auto;
  display: block;
}
</style>
