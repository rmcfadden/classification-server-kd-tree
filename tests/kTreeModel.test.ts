import { NDDataPointFeature, FeaturePredictionResult } from "classification-server/types";

import { KdTreeModel } from "../src/kdTreeModel";
test("predict", async () => {
    const dataPoints: NDDataPointFeature[] = [
        { values: [0, 0], feature: "fruit" },
        { values: [1, 1], feature: "fruit" },
        { values: [3, 3], feature: "vegetable" },
        { values: [4, 4], feature: "vegetable" },
        { values: [-2, -2], feature: "grain" },
    ];
    const { predict } = KdTreeModel(dataPoints);
    const {
        predictions: [prediction],
    }: FeaturePredictionResult = (await predict(".75,.80")) as FeaturePredictionResult;
    const { feature, probability } = prediction;
    expect(feature).toBe("fruit");
    expect(probability).toBe(100);
});
