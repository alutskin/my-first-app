import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { updateStore } from "../../utils/test-utils";
import { rootActions } from "../../store/rootSlice";
import App from "../../App";

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

describe("Card UI changes tests", () => {
    let store, cardHeader, cardBody;
    beforeEach(async () => {
        const res = updateStore();
        store = res.store;
        // Waiting for disappearing loading spinners
        await act(() => sleep(3000));

        cardHeader = screen.getByText(/This is card header/);
        cardBody = screen.getByText(/This is card body/);
    });

    test("Card is rendered with CardBody and CardHeader with right styles", async () => {
        const hr = cardBody.previousElementSibling;

        // Check CardHeader
        expect(cardHeader).toHaveClass("caption");
        expect(cardHeader).not.toHaveClass("dark-caption");

        // Check CardBody
        expect(cardBody).toHaveClass("text");
        expect(cardBody).not.toHaveClass("dark-text");

        // Check hr color
        expect(hr.getAttribute("color")).toBe("#3f3f3f");
    });

    test("Card style is changed when checked and comes back when unchecked", () => {
        const checkbox = screen.getByRole('checkbox');
        const hr = cardBody.previousElementSibling;

        userEvent.click(checkbox);

        // Check CardHeader style
        expect(cardHeader).toHaveClass("dark-caption");

        // Check CardBody style
        expect(cardBody).toHaveClass("dark-text");

        // Check hr color after setting checked
        expect(hr.getAttribute("color")).toBe("#C0C0C0");

        // Make card unchecked
        userEvent.click(checkbox);

        // Check CardHeader style becomes like before checking
        expect(cardHeader).toHaveClass("caption");
        expect(cardHeader).not.toHaveClass("dark-caption");

        // Check CardBody style becomes like before checking
        expect(cardBody).toHaveClass("text");
        expect(cardBody).not.toHaveClass("dark-text");

        // Check hr color style becomes like before checking
        expect(hr.getAttribute("color")).toBe("#3f3f3f");
    });

    test("There is no edit icon when read-only is on", async () => {
        // Activate read-only
        store.dispatch(rootActions.changeReadOnlyStatus({ target: { checked: true } }));

        // Check edit icon visibility in read-only mode
        const checkbox = screen.getByRole('checkbox');
        const editIcon = checkbox.nextElementSibling;
        expect(editIcon.getAttribute("visibility")).toBe("hidden");
    });

    test(`If card is editable: 
          1) Checked status will be disabled;
          2) Checkbox will disappear;
          3) Edit icon will disappear;
          4) Submit & cancel changes icons will appear;
          5) contentEditable of CardHeader and CardBody is true.`,
        () => {
            // Set checked status to true
            const checkbox = screen.getByRole('checkbox');
            userEvent.click(checkbox);

            // Set editable status to true
            const editIcon = checkbox.nextElementSibling;
            userEvent.click(editIcon);

            // Check checked status to be disabled
            expect(cardHeader).not.toHaveClass("dark-caption");
            expect(cardBody).toHaveClass("text");

            // Check checkbox disappears
            expect(checkbox.style.getPropertyValue("display")).toBe("none");

            // Check edit icon disappears
            expect(editIcon.getAttribute("visibility")).toBe("hidden");

            // Check submit & cancel changes icons appear
            const submitChangesIcon = editIcon.nextElementSibling;
            const cancelChangesIcon = editIcon.nextElementSibling.nextElementSibling;
            expect(submitChangesIcon.getAttribute("visibility")).toBe("visible");
            expect(cancelChangesIcon.getAttribute("visibility")).toBe("visible");

            // Check contentEditable of CardHeader and CardBody is true
            expect(cardHeader.getAttribute("contentEditable")).toBe("true");
            expect(cardBody.getAttribute("contentEditable")).toBe("true");
        }
    );

    test("New caption & text won't be saved if changes are canceled while editing", () => {
        const checkbox = screen.getByRole('checkbox');
        const editIcon = checkbox.nextElementSibling;
        const cancelChangesIcon = editIcon.nextElementSibling.nextElementSibling;
        const cardHeaderBeforeEditing = cardHeader.textContent;
        const cardBodyBeforeEditing = cardBody.textContent;

        // Set editable status to true
        userEvent.click(editIcon);

        // CardHeader value before: This is card header
        // CardHeader value after: This is card header and some extra data...
        userEvent.type(cardHeader, " and some extra data...");
        expect(cardHeader.textContent).toBe("This is card header and some extra data...");

        // Click cancel changes icon
        userEvent.click(cancelChangesIcon);

        // Check contentEditable of CardHeader and CardBody is false
        expect(cardHeader.getAttribute("contentEditable")).toBe("false");
        expect(cardBody.getAttribute("contentEditable")).toBe("false");

        // Expect there is no changes in DOM and Redux store
        expect(cardHeader.textContent).toBe(cardHeaderBeforeEditing);
        expect(store.getState().root.cardsData[0].caption).toBe(cardHeaderBeforeEditing);

        // Set editable status to true
        userEvent.click(editIcon);

        // CardBody value before: This is card body
        // CardBody value after: This is card body and some extra data...
        userEvent.type(cardBody, " and some extra data...");
        expect(cardBody.textContent).toBe("This is card body and some extra data...");

        // Click cancel changes icon
        userEvent.click(cancelChangesIcon);

        // Expect there is no changes in DOM and Redux store
        expect(cardBody.textContent).toBe(cardBodyBeforeEditing);
        expect(store.getState().root.cardsData[0].text).toBe(cardBodyBeforeEditing);

        // Check contentEditable of CardHeader and CardBody is false
        expect(cardHeader.getAttribute("contentEditable")).toBe("false");
        expect(cardBody.getAttribute("contentEditable")).toBe("false");
    });

    test("New caption and text will be saved if submit changes icon is clicked", async () => {
        const checkbox = screen.getByRole('checkbox');
        const editIcon = checkbox.nextElementSibling;
        const submitChangesIcon = editIcon.nextElementSibling;

        // Set editable status to true
        userEvent.click(editIcon);

        // CardHeader value before: This is card header
        // CardHeader value after: This is card header!
        userEvent.type(cardHeader, "!");

        // Submit changes
        userEvent.click(submitChangesIcon);

        // Expect there is changes in DOM and Redux store
        expect(cardHeader.textContent).toBe("This is card header!");
        expect(store.getState().root.cardsData[0].caption).toBe("This is card header!");

        // Set editable status to true
        userEvent.click(editIcon);

        // CardBody value before: This is card body
        // CardBody value after: This is card body... :)
        userEvent.type(cardBody, "... :)");

        // Submit changes
        userEvent.click(submitChangesIcon);

        // Expect there is changes in DOM and Redux store
        expect(cardBody.textContent).toBe("This is card body... :)");
        expect(store.getState().root.cardsData[0].text).toBe("This is card body... :)");
    });

    test("If activate read-only mode while card is editable, all the changes will be canceled", () => {
        const checkbox = screen.getByRole('checkbox');
        const editIcon = checkbox.nextElementSibling;
        const cardHeaderBeforeEditing = cardHeader.textContent;

        // Set editable status to true
        userEvent.click(editIcon);

        // CardHeader value before: This is card header
        // CardHeader value after: This is card header and some extra data :)
        userEvent.type(cardHeader, " and some extra data :)");

        // Activate read-only
        store.dispatch(rootActions.changeReadOnlyStatus({ target: { checked: true } }));

        // Expecting changes are canceled
        expect(cardHeader.textContent).toBe(cardHeaderBeforeEditing);
        expect(store.getState().root.cardsData[0].caption).toBe(cardHeaderBeforeEditing);
    });
});

test("Navigation is changed when card is doubleclicked and not editable", async () => {
    updateStore(<BrowserRouter> <App /> </BrowserRouter>);
    // Waiting for fetching data and disappearing loading spinners
    await act(() => sleep(3000));
    const checkbox = screen.getAllByRole('checkbox')[0];
    const editIcon = checkbox.nextElementSibling;
    const cancelChangesIcon = editIcon.nextElementSibling.nextElementSibling;

    // Set editable status to true
    userEvent.click(editIcon);

    // Find CardHeader of the first Card and doubleclick on it
    const cardHeader = screen.getAllByText(/Bulbasaur/)[0];
    userEvent.dblClick(cardHeader.parentElement);

    // Check user is not on the CardDetails page because Card is editable
    expect(window.location.href.toString()).not.toMatch(/\/card\//);

    // Set editable status to false
    userEvent.click(cancelChangesIcon);

    // Doubleclick on the first Card
    userEvent.dblClick(cardHeader.parentElement);

    // Check user is now on the CardDetails page
    expect(window.location.href.toString()).toMatch(/\/card\//);
    // And this CardDetails contains the same CardHeader as the Card found before navigation
    expect(screen.getAllByText(/Bulbasaur/)[0]).toBeDefined();
});
