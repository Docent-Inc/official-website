const loadImages = () => {
    const context = require.context('../../public/img', false, /\.(png|jpe?g|svg)$/);
    const images = {};

    context.keys().forEach((key) => {
        const imageKey = key.replace('./', '');
        images[imageKey] = context(key).default;
    });

    return images;
};

export default loadImages;