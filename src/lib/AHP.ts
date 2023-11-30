class AHP {
    NormalizedData: { [key: string]: { [key: string]: number[] } } | undefined;
    Weight: { [key: string]: number } | undefined;
    Items: string[] | undefined;

    setItems(Items: string[]) {
        this.Items = Items;
    }

    setAlternatives(NormalizedData: {
        [key: string]: { [key: string]: number[] };
    }) {
        this.NormalizedData = NormalizedData;
    }

    setWeight(w: any) {
        this.Weight = w;
    }
    
    run() {
        const result: { [key: string]: number } = {};
        for (let i = 0; i < this.Items!.length; i++) {
            result[this.Items![i]] = 0;
            for (const macro of Object.keys(this.NormalizedData!)) {
                for (const sub of Object.keys(this.NormalizedData![macro])) {
                    result[this.Items![i]] +=
                        this.NormalizedData![macro][sub][i] *
                        this.Weight![sub];
                }
            }
        }
        return result;
    }
}

export default AHP;
