import { NDDataPointLabel, NDDataPoint } from "classification-server/types";
import { KDTreeGenerator } from "../src/kDTreeGenerator";
import { KDTreeSearcher } from "../src/kDTreeSearcher";
test("search", () => {
    const dataPoints: NDDataPointLabel[] = [
        { values: [40, 45], label: "A" },
        { values: [15, 70], label: "B" },
        { values: [70, 10], label: "C" },

        { values: [69, 50], label: "D" },
        { values: [66, 85], label: "E" },
        { values: [85, 90], label: "F" },
    ];
    const { generate } = KDTreeGenerator();
    const root = generate(dataPoints);

    const { search } = KDTreeSearcher();
    const result = search(root, { values: [14, 6] } as NDDataPoint);
});
