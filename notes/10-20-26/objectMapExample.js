document.addEventListener("DOMContentLoaded", () => {

    let data = [
        {
            name: "Jake"
        },

        {
            name: "Blue"
        },
    ];

    let lowercaseData = data.map( (obj) => {
        obj.name = obj.name.toLowerCase();
        return obj
    });

    console.log(data);

});