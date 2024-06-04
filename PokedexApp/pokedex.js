import { fetch } from "undici";

export class Pokedex {

    url;

    authorization;

    useragent;

    constructor(options = {}) {

        this.url = "https://ex.traction.one/pokedex";

        this.authorization = options?.authorization;

        this.useragent = options?.useragent || "pokedex.js";

    }

    request = async (path = "/") => {

        const res = await fetch(this.url + path, {

            headers: {

                "authorization": this.authorization,

                "user-agent": this.useragent,

            },

        });

        const body = await res.json();

        if (res.status >= 400 && res.status < 600) {

            throw body;

        }

        return body;

    };

    getEvolutionStone = async (name) => {

        return await this.request("/evolution/stones/" + name);

    };

    getPokemon = async (slug) => {

        return await this.request("/pokemon/" + slug);

    };

    listEvolutionStones = async () => {

        return await this.request("/evolution/stones");

    };

    listPokemon = async () => {

        return await this.request("/pokemon");

    };

}