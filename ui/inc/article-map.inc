<article class="article">
    <header>
        <h2 class="h2">위치보기</h2>
    </header>
    <div class="mapWrap box-white">
        <div id="map" style="width:100%;height:237.5px;"></div>
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=73b02ca024e4f2933f03ff11aa5280c8"></script>
        <script>
            var container = document.getElementById('map');
            var options = {
                center: new daum.maps.LatLng(33.450701, 126.570667),
                level: 3
            };

            var map = new daum.maps.Map(container, options);
        </script>
    </div>
</article>