import StateMachineAnimation from "../Engine/StateMachineAnimation";

class RandomModularArithmeticAnimation extends StateMachineAnimation {

    constructor (height, width) {

        const generator1 = (i, j) => {
            return (i+j) % (Math.abs(i-j));
        };

        const generator2 = (i, j) => {
            return i ^ j;
        };

        const generator3 = (i, j) => {
            return i ^ (i % j);
        };

        const generator7 = (i, j) => {
            return (i + j) ^ (i%j);
        };

        const generator8 = (i, j) => {
            return (i%j) ^ (j%i);
        };

        const generator9 = (i, j) => {
            return i % (i ^ j);
        };


        const twoFactorGenerator = () => {
            const factor1 = Math.floor(Math.random() * 7) - 3;
            const factor2 = Math.floor(Math.random() * 7) - 3;
            return (i, j) => {
                return i*factor1 + j*factor2;
            };
        };

        const checkerboardGenerators = [
            //generator1,
            generator2,
            generator3,
            generator7,
            generator8,
            generator9,
        ];

        const lineGenerator1 = twoFactorGenerator();
        const lineGenerator2 = twoFactorGenerator();
        const lineGenerator3 = twoFactorGenerator();

        const differentLineGenerators = [
            lineGenerator1,
            lineGenerator2,
            lineGenerator3
        ];

        const sameLineGenerators = [
            lineGenerator1
        ];
        
        const generatorFamilies = [
            checkerboardGenerators,
            sameLineGenerators,
            differentLineGenerators
        ];
        
        const chosenGeneratorFamily = generatorFamilies[Math.floor(Math.random()*generatorFamilies.length)];

        const chosenGenerator1 = chosenGeneratorFamily[Math.floor(Math.random()*chosenGeneratorFamily.length)];
        const chosenGenerator2 = chosenGeneratorFamily[Math.floor(Math.random()*chosenGeneratorFamily.length)];
        const chosenGenerator3 = chosenGeneratorFamily[Math.floor(Math.random()*chosenGeneratorFamily.length)];

        const initialStateGenerator = (i, j) => {
            return {
                a: chosenGenerator1(i, j),
                b: chosenGenerator2(i, j),
                c: chosenGenerator3(i, j)
            };
        };

        const aModifier = Math.floor((Math.random() - 0.5) * 10);
        const bModifier = Math.floor((Math.random() - 0.5) * 10);
        const cModifier = Math.floor((Math.random() - 0.5) * 10);

        const stateTransition = (state) => {

            state.a = state.a + aModifier;
            state.b = state.b + bModifier;
            state.c = state.c + cModifier;
        };

        const redMod = 128 + Math.ceil(Math.random() * 128);
        const greenMod = 128 + Math.ceil(Math.random() * 128);
        const blueMod = 128 + Math.ceil(Math.random() * 128);
        const redAdd = Math.ceil(Math.random() * (256 - redMod));
        const greenAdd = Math.ceil(Math.random() * (256 - greenMod));
        const blueAdd = Math.ceil(Math.random() * (256 - blueMod));

        const colorGenerator = (cellState) => {
            return {
                red: redAdd + Math.abs(cellState.a) % redMod,
                green: greenAdd + Math.abs(cellState.b) % greenMod,
                blue: blueAdd + Math.abs(cellState.c) % blueMod,
                alpha: 255
            };
        };

        super(height, width, initialStateGenerator, stateTransition, colorGenerator );
    }

}

export default RandomModularArithmeticAnimation;