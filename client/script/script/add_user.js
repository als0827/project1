window.addEventListener("DOMContentLoaded", () => {
    // id 부터 힌트까지 항목을 입력한 뒤에 폼을 통해서 서버에 데이터를 전송
    const signupForm = document.querySelector("#signup_form");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // 등록 버튼 눌러도 새로고침 되지 않음
        const result = await fetch("http://localhost:3000/User", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: document.querySelector("#user_id").value,
                pwd: document.querySelector("#user_pwd").value,
                name: document.querySelector("#user_name").value,
                nickname: document.querySelector("#user_nick").value,
                email: document.querySelector("#user_email").value,
                hint: document.querySelector("#user_hint").value
            })
        });
        if(result.ok) {
            const response = await result.json();
            if (response.status === 'success') {
                // alert("회원가입 성공!");
                location.href = 'https://www.naver.com';
            }
        }
    })
})