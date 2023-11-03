import {
    DataSet,
    PredictionResult,
    NDDataPointFeature,
    FeaturePredictionResult,
    NDDataPoint,
    ModelBase,
} from "classification-server/types";
import { NDDataPointConverter } from "classification-server/converters";

export const KdTreeModel = (dataFeatures: NDDataPointFeature[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const { values }: NDDataPoint = NDDataPointConverter().parse(input);
        const sortedFeatures = [...dataFeatures].sort(
            (a: NDDataPointFeature, b: NDDataPointFeature) =>
                Math.hypot(...a.values.map((a1, i) => values[i] - a1)) -
                Math.hypot(...b.values.map((b1, i) => values[i] - b1))
        );
        // TODO: how do I determine probability based on distance (posterior probability?)
        return {
            predictions: sortedFeatures.map(({ feature }) => ({
                feature,
                probability: 100,
            })),
        } as FeaturePredictionResult;
    };
    const train = async (dataSet: DataSet) => KdTreeModel(dataSet.items as NDDataPointFeature[]);
    return { predict, train, name: "nDDataPointFeature-KDTree" } as ModelBase;
};
