document.addEventListener('DOMContentLoaded', () => {
    const blog = document.getElementById('blogform');
    const titleshow = document.getElementById('title-show');
    const contentshow = document.getElementById('content-show');
    const imageshow = document.getElementById('image-show');
    const videoshow = document.getElementById('video-show');
    blog.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').files[0];
        const video = document.getElementById('video').files[0];

        titleshow.textContent = title;
        contentshow.textContent = content;
        imageshow.src = URL.createObjectURL(image);
        videoshow.src = URL.createObjectURL(video);

        document.getElementById('form-submission').style.display = 'block';
        blog.reset();
    });
});