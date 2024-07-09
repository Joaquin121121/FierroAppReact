const setSlider = (field, sliderBarX, sliderBarWidth, x) => {
    let ratio, width, count
    width = x - sliderBarX
    ratio = width / sliderBarWidth

    if(ratio < 0.2){
        ratio = 0.2
    }else if(ratio > 1){
        ratio = 1
    }
    count = (field === "duration") ? 20 + Math.trunc(10 * ratio) * 10 : Math.trunc((ratio - 0.2) / 0.8 * 3) + 2     
    width = sliderBarWidth * ratio

    return [width, count]
}

export default setSlider 