document.addEventListener("DOMContentLoaded", function () {
    addRemoveItemBtnListeners();
    addAddItemQtyListeners();
    addMinusItemQtyListeners();
    addVariationDropdownListeners();
    addIncludeItemListeners();
    addSelectAllBtnListener();
});

const addRemoveItemBtnListeners = function () {
    const removeItemBtns = document.querySelectorAll(".remove-btn");
    for (const removeItemBtn of removeItemBtns) {
        removeItemBtn.addEventListener("click", async function () {
            const index = removeItemBtn.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];

            const response = await fetch("/removeCartItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                }),
            });

            if (response.status == 200) {
                window.location.reload();
            }
        });
    }
};

const addAddItemQtyListeners = function () {
    const addItemQtyBtns = document.querySelectorAll(".add-btn");
    for (const addItemQtyBtn of addItemQtyBtns) {
        addItemQtyBtn.addEventListener("click", async function () {
            const index = addItemQtyBtn.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];

            const response = await fetch("/addCartItemQty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                }),
            });

            if (response.status == 200) {
                window.location.reload();
            }
        });
    }
};

const addMinusItemQtyListeners = function () {
    const minusItemQtyBtns = document.querySelectorAll(".minus-btn");
    for (const minusItemQtyBtn of minusItemQtyBtns) {
        minusItemQtyBtn.addEventListener("click", async function () {
            const index = minusItemQtyBtn.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];

            const response = await fetch("/minusCartItemQty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                }),
            });

            if (response.status == 200) {
                window.location.reload();
            }
        });
    }
};

const addVariationDropdownListeners = function () {
    const itemVariantDropdowns = document.querySelectorAll(".item-variant");
    for (const itemVariantDropdown of itemVariantDropdowns) {
        itemVariantDropdown.addEventListener("change", async function () {
            const index = itemVariantDropdown.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];
            const variant = itemVariantDropdown.value;

            const response = await fetch("/setItemVariation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                    variant: variant,
                }),
            });

            // if (response.status == 200) {
            //     window.location.reload();
            // }
        });
    }
};

const addIncludeItemListeners = function () {
    const includeItemCheckboxes = document.querySelectorAll(".checkbox-custom");
    for (const includeItemCheckbox of includeItemCheckboxes) {
        includeItemCheckbox.addEventListener("click", async function () {
            const index = includeItemCheckbox.parentElement.parentElement
                .querySelector(".item-id")
                .innerText.split("-")[0];
            const includeItem =
                !includeItemCheckbox.classList.contains("checkbox-checked");

            // update checkbox appearance
            if (includeItemCheckbox.classList.contains("checkbox-checked")) {
                includeItemCheckbox.classList.remove("checkbox-checked");
                includeItemCheckbox.classList.add("checkbox-empty");
            } else {
                includeItemCheckbox.classList.remove("checkbox-empty");
                includeItemCheckbox.classList.add("checkbox-checked");
            }

            const response = await fetch("/setItemInclusion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    index: index,
                    includeItem: includeItem,
                }),
            });

            // if (response.status == 200) {
            //     window.location.reload();
            // }
        });
    }
};

const addSelectAllBtnListener = async function () {
    const selectAllBtn = document.querySelector(".select-all");
    const includeItemCheckboxes = document.querySelectorAll(".checkbox-custom");

    // set all checkboxes to checked
    selectAllBtn.addEventListener("click", async function () {
        for (const includeItemCheckbox of includeItemCheckboxes) {
            // update checkboxes appearance
            if (!includeItemCheckbox.classList.contains("checkbox-checked")) {
                includeItemCheckbox.classList.add("checkbox-checked");
            }
            includeItemCheckbox.classList.remove("checkbox-empty");
        }

        // set all items to be included in user's shopping cart
        const response = await fetch("/setAllItemInclusion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                includeItem: true,
            }),
        });

        // if (response.status == 200) {
        //     window.location.reload();
        // }
    });
};
