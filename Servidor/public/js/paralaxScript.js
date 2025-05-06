document.addEventListener('scroll', function () {
    const layers = document.querySelectorAll('.paralax-effect');
    const scrollTop = window.pageYOffset;

    layers.forEach((layer, index) => {
        if (layer.id === 'layer4') return; // camada 5 é fixa, sem efeito
        const speed = (4 - index) * 0.2; // velocidade invertida: layer1 se move mais, layer4 menos
        layer.style.transform = `translateY(${scrollTop * speed}px)`;
    });
});
