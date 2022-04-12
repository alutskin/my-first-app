import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const getCards = async dispatch => {
    let cards = [];

    try {
        const response = await axios.get(
            "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json"
        );

        const data = response.data.slice(0, 15);

        cards = data.map((element) => {
            return {
                id: uuidv4(),
                caption: element.Name,
                text: element.About,
                checked: false,
            };
        });

    } catch (error) { }

    dispatch({ type: "fetch-data", cards });
};
