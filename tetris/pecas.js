function orientPoints(tipoPeca, rotacao) {
    let resultados = [];
    switch (tipoPeca) {
        case 0:
            switch (rotacao) {
                case 0:
                    resultados = [
                        [-2, 0],
                        [-1, 0],
                        [0, 0],
                        [1, 0]
                    ];
                    break;
                case 1:
                    resultados = [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [0, 2]
                    ];
                    break;
                case 2:
                    resultados = [
                        [-2, 1],
                        [-1, 1],
                        [0, 1],
                        [1, 1]
                    ];
                    break;
                case 3:
                    resultados = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [-1, 2]
                    ];
                    break;
            }
            break;
        case 1:
            switch (rotacao) {
                case 0:
                    resultados = [
                        [-2, -1],
                        [-2, 0],
                        [-1, 0],
                        [0, 0]
                    ];
                    break;
                case 1:
                    resultados = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [0, -1]
                    ];
                    break;
                case 2:
                    resultados = [
                        [-2, 0],
                        [-1, 0],
                        [0, 0],
                        [0, 1]
                    ];
                    break;
                case 3:
                    resultados = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [-2, 1]
                    ];
                    break;
            }
            break;
        case 2:
            switch (rotacao) {
                case 0:
                    resultados = [
                        [-2, 0],
                        [-1, 0],
                        [0, 0],
                        [0, -1]
                    ];
                    break;
                case 1:
                    resultados = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [0, 1]
                    ];
                    break;
                case 2:
                    resultados = [
                        [-2, 0],
                        [-2, 1],
                        [-1, 0],
                        [0, 0]
                    ];
                    break;
                case 3:
                    resultados = [
                        [-2, -1],
                        [-1, -1],
                        [-1, 0],
                        [-1, 1]
                    ];
                    break;
            }
            break;
        case 3:
            resultados = [
                [-1, -1],
                [0, -1],
                [-1, 0],
                [0, 0]
            ];
            break;
        case 4:
            switch (rotacao) {
                case 0:
                    resultados = [
                        [-1, -1],
                        [-2, 0],
                        [-1, 0],
                        [0, -1]
                    ];
                    break;
                case 1:
                    resultados = [
                        [-1, -1],
                        [-1, 0],
                        [0, 0],
                        [0, 1]
                    ];
                    break;
                case 2:
                    resultados = [
                        [-1, 0],
                        [-2, 1],
                        [-1, 1],
                        [0, 0]
                    ];
                    break;
                case 3:
                    resultados = [
                        [-2, -1],
                        [-2, 0],
                        [-1, 0],
                        [-1, 1]
                    ];
                    break;
            }
            break;
        case 5:
            switch (rotacao) {
                case 0:
                    resultados = [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [0, -1]
                    ];
                    break;
                case 1:
                    resultados = [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [1, 0]
                    ];
                    break;
                case 2:
                    resultados = [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [0, 1]
                    ];
                    break;
                case 3:
                    resultados = [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [-1, 0]
                    ];
                    break;
            }
            break;
        case 6:
            switch (rotacao) {
                case 0:
                    resultados = [
                        [-2, -1],
                        [-1, -1],
                        [-1, 0],
                        [0, 0]
                    ];
                    break;
                case 1:
                    resultados = [
                        [-1, 0],
                        [-1, 1],
                        [0, 0],
                        [0, -1]
                    ];
                    break;
                case 2:
                    resultados = [
                        [-2, 0],
                        [-1, 0],
                        [-1, 1],
                        [0, 1]
                    ];
                    break;
                case 3:
                    resultados = [
                        [-2, 0],
                        [-2, 1],
                        [-1, 0],
                        [-1, -1]
                    ];
                    break;
            }
            break;
    }
    return resultados;
}