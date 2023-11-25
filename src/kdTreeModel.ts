import {
    DataSet,
    PredictionResult,
    NDDataPointLabel,
    LabelPredictionResult,
    NDDataPoint,
    ModelBase,
} from "classification-server/types";
import { NDDataPointConverter } from "classification-server/converters";

export const KdTreeModel = (dataLabels: NDDataPointLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const { values }: NDDataPoint = NDDataPointConverter().parse(input);
        const sortedLabels = [...dataLabels].sort(
            (a: NDDataPointLabel, b: NDDataPointLabel) =>
                Math.hypot(...a.values.map((a1, i) => values[i] - a1)) -
                Math.hypot(...b.values.map((b1, i) => values[i] - b1))
        );
        // TODO: how do I determine probability based on distance (posterior probability?)
        return {
            predictions: sortedLabels.map(({ label }) => ({
                label,
                probability: 100,
            })),
        } as LabelPredictionResult;
    };
    const train = async (dataSet: DataSet) => KdTreeModel(dataSet.items as NDDataPointLabel[]);
    return { predict, train, name: "nDDataPointLabel-KDTree" } as ModelBase;
};
