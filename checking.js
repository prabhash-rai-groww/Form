const spouse_name = document.getElementById("name_of_spouse");
const terms_conditions = document.getElementById("terms_conditions");

function marital() {
    spouse_name.disabled = true;
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
        alert("Please fill " + [...req_fields]);

        for (element of req_fields) {
            const empty_elements =  document.getElementsByName(element);

            for (empty_element of empty_elements) {

                empty_element.focus();
                break;
            }

            break;
        }
    }
    else {
        const terms = document.getElementById("terms_conditions");
        if (terms.checked) {
            alert("Thanks for filling the form!!!");
        }
        else {
            terms_conditions.focus();
            alert("Please accept the terms and conditions.");
        }
    }
}