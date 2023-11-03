import {
    ClassifyQuery,
    ClassifyDataSetQuery,
    FeatureClassifyResponse,
    FeaturePrediction,
    ClassifierBase,
} from "classification-server/types";

export const KDTreeClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const { dataSet } = query as ClassifyDataSetQuery;
        //const modelsFactory = ModelsFactory();
        //const model = modelsFactory.create("dataPointFeature");
        //const predictionModel = await model.train(dataSet);
        //const { predictions } = (await predictionModel.predict(
        //  text
        //)) as FeatureClassifyResponse;
        return { predictions: [] as FeaturePrediction[] } as FeatureClassifyResponse;
    };
    return { classify, name: "nDDataPointFeature-KDTree" } as ClassifierBase;
};
