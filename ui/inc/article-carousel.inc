<article class="carousel-wrap" id="carouselWrap">
    <div class="carousel-wrap-items">
        <div class="item">
            <img src="img/carousel1.jpg" alt="">
        </div>
        <div class="item">
            <img src="img/carousel2.jpg" alt="">
        </div>
        <div class="item">
            <img src="img/carousel3.jpg" alt="">
        </div>
        <div class="item">
            <img src="img/carousel4.jpg" alt="">
        </div>
    </div>
</article>

<script>
    ampJS.sliderJS.init('#carouselWrap');
    /*var slide = document.getElementById("carouselWrap");
    var itemWrap = slide.firstElementChild;
    var items = document.getElementsByClassName("item");
    var slideArray = items;
    function initSlider(idx){
        var currentSlideIndex = (idx>slideArray.length)?slideArray.length-1:idx;
        var imgWidth = items[0].children[0].offsetWidth;
        itemWrap.style.width = slideArray.length * (imgWidth) + 'px';
        console.log(imgWidth,items[0].children[0].offsetWidth)
        for(var i = 0; i < slideArray.length; i++) {
            items[i].style.width= imgWidth + 'px';
            items[i].style.left = (i*imgWidth) + 'px';
        }
        itemWrap.style.left = currentSlideIndex * (imgWidth) * (-1) + 'px';
        // items[currentSlideIndex].style.left = "0";
    }

    // Create our slider
    initSlider(1);*/


</script>