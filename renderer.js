const imv = document.querySelector('#imageViewer')
const app = document.querySelector('#app')
var scale = 1
const zoomFactor = 0.1;

async function openImage() {
    const imfp = await window.procs.get_afp()

    if (imfp == null) {
        return
    }
    imv.setAttribute('src', imfp)
    app.addEventListener('wheel', (e) => {
        e.preventDefault()

        if (e.deltaY < 0) {
            // 向前滚动：放大
            scale += zoomFactor;
        } else {
            // 向后滚动：缩小
            scale = Math.max(0.1, scale - zoomFactor); // 最小缩放 0.1x
        }

        imv.style.transform = `scale(${scale})`;
    })
}

openImage()
