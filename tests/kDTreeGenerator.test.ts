import { NDDataPointLabel } from "classification-server/types";
import { KDTreeGenerator } from "../src/kDTreeGenerator";
import { KDTreeNode } from "../src/kDTreeNode";
test("generate simple", () => {
    const dataPoints: NDDataPointLabel[] = [
        { values: [0, 0], label: "meat" },
        { values: [1, 1], label: "fruit" },
        { values: [2, 2], label: "vegetable" },
    ];
    const { generate } = KDTreeGenerator();
    const root = generate(dataPoints);
    expect(root).toBeDefined();
    const { left: leftNode, right: rightNode, value: rootValue } = root as KDTreeNode;
    const { value: { label: leftLabel, values: leftValues } } = leftNode as KDTreeNode
    const { value: { label: rightLabel, values: rightValues } } = rightNode as KDTreeNode

    expect(rootValue.label).toBe("fruit");
    expect(rootValue.values).toEqual([1, 1]);
    expect(leftLabel).toBe("meat");
    expect(leftValues).toEqual([0, 0]);
    expect(rightLabel).toBe("vegetable");
    expect(rightValues).toEqual([2, 2]);
});

test("generate even", () => {
    const dataPoints: NDDataPointLabel[] = [
        { values: [0, 0], label: "meat" },
        { values: [3, 3], label: "vegetable" },
        { values: [2, 2], label: "vegetable" },
        { values: [1, 1], label: "fruit" },

    ];
    const { generate } = KDTreeGenerator();
    const root = generate(dataPoints);
    expect(root).toBeDefined();

    const { left: leftNode, right: rightNode, value: rootValue } = root as KDTreeNode;
    const { value: { label: leftLabel, values: leftValues } } = leftNode as KDTreeNode
    const { value: { label: rightLabel, values: rightValues } } = rightNode as KDTreeNode
    const { left: leftLeftNode } = leftNode as KDTreeNode;
    const { value: { label: leftLeftLabel, values: leftLeftValues } } = leftLeftNode as KDTreeNode
    expect(rootValue.label).toBe("vegetable");
    expect(rootValue.values).toEqual([2, 2]);
    expect(leftLabel).toBe("fruit");
    expect(leftValues).toEqual([1, 1]);
    expect(rightLabel).toBe("vegetable");
    expect(rightValues).toEqual([3, 3]);
    expect(leftLeftLabel).toBe("meat");
    expect(leftLeftValues).toEqual([0, 0]);

});
