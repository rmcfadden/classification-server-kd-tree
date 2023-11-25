import { NDDataPointLabel, LabelPredictionResult } from "classification-server/types";
import { KdTreeModel } from "../src/kdTreeModel";
test("predict", async () => {
    const dataPoints: NDDataPointLabel[] = [
        { values: [0, 0], label: "fruit" },
        { values: [1, 1], label: "fruit" },
        { values: [3, 3], label: "vegetable" },
        { values: [4, 4], label: "vegetable" },
        { values: [-2, -2], label: "grain" },
    ];
    const { predict } = KdTreeModel(dataPoints);
    const {
        predictions: [prediction],
    }: LabelPredictionResult = (await predict(".75,.80")) as LabelPredictionResult;
    const { label, probability } = prediction;
    expect(label).toBe("fruit");
    expect(probability).toBe(100);
});
