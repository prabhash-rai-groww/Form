const save_button = document.getElementById("save");
save_button.addEventListener('click', check_filled_data);

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

    if (req_fields.size) {
        alert("Please fill these details => \n" + [...req_fields]);
    }
    else {
        alert("Thanks for filling the form!!!");
    }
}