const autoScroll = (targetY) => {
    let currentY = 0
    document.body.style.overflow = "hidden"
    let interval = setInterval(()=>{
        if(currentY - window.innerHeight< targetY ){
            currentY += 5
            window.scrollTo(0, currentY)
        }else{
            clearInterval(interval)
            document.body.style.overflow = ""
        }
    }, 2)
}

export default autoScroll