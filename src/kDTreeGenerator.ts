import { NDDataPointLabel } from "classification-server/types";
import { KDTreeNode } from "./kDTreeNode";
export const KDTreeGenerator = () => {
    const generateLevel = (
        dataPoints: NDDataPointLabel[],
        level: number
    ): KDTreeNode | undefined => {
        const { length } = dataPoints;
        if (length === 0) return undefined;
        const n = dataPoints[0].values.length;
        const k = level % n;
        const sortedPoints = [...dataPoints].sort((a, b) => a.values[k] - b.values[k]);
        const mid = Math.floor(length / 2);
        const midNode = sortedPoints[mid];
        return {
            k,
            value: midNode,
            left: generateLevel([...sortedPoints].slice(0, mid), level + 1),
            right: generateLevel([...sortedPoints].slice(mid + 1, length), level + 1),
        } as KDTreeNode;
    };
    const generate = (dataPoints: NDDataPointLabel[]): KDTreeNode | undefined =>
        generateLevel(dataPoints, 0);
    return { generate };
};
