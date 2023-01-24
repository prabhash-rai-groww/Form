const save_button = document.getElementById("save");
save_button.addEventListener('click', check_filled_data);

const reset_button = document.getElementById("reset");
reset_button.addEventListener('click', remove_filled_details);

const spouse_name = document.getElementById("name_of_spouse");

function marital () {
    spouse_name.disabled = true;
}

function remove_filled_details() {
    const table = document.getElementById("input_form").getElementsByTagName("tr");

    const total_fields = table.length;

    for (let i = 0; i < total_fields; i++) {
        const row_data = table[i].getElementsByTagName("td");

        for (let j = 0; j < row_data.length; j++) {
            const data_filled = row_data[j].getElementsByTagName("input");

            if (data_filled.length === 0) continue;

            for (let input = 0; input < data_filled.length; input++) {

                //check text inputs
                if (data_filled[input].type === "text" && data_filled[input].value) {
                    data_filled[input].value = "";
                }

                // check radio inputs
                if (data_filled[input].type === 'radio') {

                    const options = document.getElementsByName(data_filled[input].name);

                    for (const option of options) {
                        if (option.checked) {
                            option.checked = false;
                        }
                    }
                }
            }
        }
    }

    spouse_name.disabled = false;
}

function check_filled_data() {
    const req_fields = new Set([]);

    const table = document.getElementById("input_form").getElementsByTagName("tr");

    const total_fields = table.length;

    for (let i = 0; i < total_fields; i++) {
        const row_data = table[i].getElementsByTagName("td");

        for (let j = 0; j < row_data.length; j++) {
            const data_filled = row_data[j].getElementsByTagName("input");

            if (data_filled.length === 0) continue;

            for (let input = 0; input < data_filled.length; input++) {

                //check text inputs
                if (data_filled[input].type === "text" && !data_filled[input].value) {
                    req_fields.add(data_filled[input].name);
                }

                // check radio inputs
                if (data_filled[input].type === 'radio') {

                    const options = document.getElementsByName(data_filled[input].name);

                    let checked = false;

                    for (const option of options) {
                        if (option.checked) checked = true;
                    }

                    if (checked === false) {
                        req_fields.add(data_filled[input].name);
                    }
                }
            }
        }
    }

    if (spouse_name.disabled) req_fields.delete("name of spouse");

    if (req_fields.size) {
        alert("Please fill these details => \n" + [...req_fields]);
    }
    else {
        const terms = document.getElementById("terms_conditions");
        if (terms.checked) {
            alert("Thanks for filling the form!!!");
        }
        else {
            alert("Please accept the terms and conditions.");
        }
    }
}