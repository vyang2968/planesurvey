window.onload = () => {
    document.getElementById("form").onsubmit = (event) => {
        event.preventDefault();

        let form = document.getElementById("form");
        const formData = new FormData(form);
        console.log(...formData);
        try {
            let url = new URL(window.location.href + "submission");
            fetch(url, {
                method: "POST",
                body: formData
            }).then((response) => {
                if (response.status === 201) {
                    window.location.href = window.location.href + "submitted";
                }
            })
        } catch (e) {
            console.error(e);
        }
    }
}

function validate() {
    var dropdown = document.getElementById("dropdown");
    var selected = dropdown.value;
    if (selected === "none") {
        dropdown.setCustomValidity("Please select one");
        
        return false;
    } else {
        dropdown.setCustomValidity("");
    }

    var checkboxes = document.getElementsByClassName("airline");
    let numSelected = 0;
    for (var checkbox of checkboxes) {
        if (checkbox.checked) {
            numSelected++;
        }

        if (numSelected > 0) {
            break;
        }
    }

    if (numSelected == 0) {
        document.getElementById("american").setCustomValidity("Please check one");

        return false;
    } else {
        document.getElementById("american").setCustomValidity("");
    }

    if (!document.getElementById("form").checkValidity()) {
        return false;
    }

    return true;
}