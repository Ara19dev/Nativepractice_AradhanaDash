document.addEventListener("DOMContentLoaded", () => {
    const siForm = document.getElementById("sform");
    const loPage = document.getElementById("lpage");
    const siPage = document.getElementById("spage");
    const loUserInput = document.getElementById("luser");

    siForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const siUser = document.getElementById("suser").value;
        const siPass = document.getElementById("spass").value;
        localStorage.setItem("username", siUser);
        localStorage.setItem("password", siPass);
        siPage.style.display = "none";
        loPage.style.display = "block";
        loUserInput.value = siUser;
    });
    const lform = document.getElementById("lform");
    lform.addEventListener("submit", (g) => {
        g.preventDefault();
        const loUsername = document.getElementById("luser").value;
        const loPassword = document.getElementById("lpass").value;
        const stUsername = localStorage.getItem("username");
        const stPassword = localStorage.getItem("password");
         if (loUsername === stUsername && loPassword === stPassword) {
            alert("Login successful!");
        } else {
            alert("Invalid username or password.");
        }
    });
});
