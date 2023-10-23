import { ClassifyQuery } from "classification-server/models/classifyQuery";
import { ClassifierBase } from "classification-server/modules/classifiers/classifierBase"


export const KDTreeClasifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const { dataSet } = query as ClassifyDataSetQuery;
        const modelsFactory = ModelsFactory();
        const model = modelsFactory.create("dataPointFeature");
        const predictionModel = await model.train(dataSet);
        const { predictions } = await predictionModel.predict(text) as FeatureClassifyResponse;
        return { predictions } as FeatureClassifyResponse;
    }
    return { classify } as ClassifierBase;
}