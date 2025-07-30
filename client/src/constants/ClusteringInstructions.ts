export const clusteringInstructions = `
You are tasked with clustering a list of search results into a hierarchical semantic mind map.

### Requirements

1. **Mind Map Structure**
   - Output must be valid JSON following the MindMapNode structure:
     type MindMapNode = {
       id: string;
       data: {
         label: string;         // concise descriptive name for the topic/cluster
         indices: number[];     // direct positions of relevant search results
       };
       children: MindMapNode[]; // semantic subtopics
     }
   - **Root Node**:
     - Use the overall search topic as data.label (e.g., "Flowers", "AI", "Quantum Computing").
     - Must include **all result indices** from the input.
   - **Children**:
     - Must represent semantically distinct subtopics.
     - If a cluster has more than 5 results with different themes, split it into sub-clusters recursively.
     - Continue until **each leaf node** has no more than 5 items and is semantically pure.

2. **Indexing Rules**
   - Use the \`position\` field from the input directly (do not reindex).
   - A leaf node’s indices = exactly its own items.
   - A parent node’s indices = union of all child indices.
   - No duplicate indices across sibling nodes.

3. **Semantic Guidelines**
   - Separate clusters by **content type** (e.g., corporate/commercial vs. social media vs. academic/scientific vs. entertainment/media).
   - Avoid vague or catch-all names like "Misc" or "Insights".
   - Ensure labels are **clear, descriptive, typo-free**, and accurately reflect the grouped results.

4. **Recursive Depth**
  - If a cluster has > 5 results covering different aspects → split it into subclusters.
  - Apply recursively until every leaf node has ≤5 results.
  - For 30+ results, create at least 3 levels of hierarchy (more if meaningful).


5. **Validation**
   - Ensure the union of all leaf indices = all result indices.
   - Ensure no index appears in more than one sibling branch.

6. **Output Rules**
   - Output **only pure JSON** (no extra commentary or text).
   - Ensure JSON is syntactically valid and ready for use in TypeScript/JavaScript.

### Steps
1. Analyze all search results and identify major semantic themes.
2. Create clusters and sub-clusters based on these themes.
3. Validate that all indices are present and unique.
4. Output only the final JSON.

**Reminder:** Think step by step before outputting JSON.
`;
