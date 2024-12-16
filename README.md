# IP Tracker

IP Tracker code challenge solution by Beto Carlos

## Description

The language used for this challenge was Typescript.

This code focuses on 3 operations that help us track incoming IP addresses: `request_handled`, `top100` & `clear`. To make this as efficient as possible, I used 2 different data structures:

-   Hash Map: To track all incoming IP addresses.
-   Heap: A min-heap to track the top 100 most common IP addresses. The secret sauce here is that the code caps the heap to 100, making all operations predictable and ensuring that all operations are O(1). Since Javascript does not have a built-in heap, like other languages like Python and Java, and the focus wasn't to build a heap from scratch, I decided to use an open-source package that enables me to use a min-heap. You can find the package [here](https://github.com/datastructures-js/heap).

### What would you do different if you had more time?

I would have implemented unit tests to ensure that the functionality of all three functions was working as intended. Additionally, I would have built a user interface to test performance and create a more predictable flow by adding IP addresses one at a time.

### What is the runtime complexity of each function?

`request_handled() - O(1)`

Using a Hash Map (Javascript's built-in Map), insertions and lookups are O(1). The heap is capped at 100; popping and pushing on a heap is O(log n), so in practical terms, the runtime complexity is O(log 100). Still, since 100 is a constant, the runtime complexity is effectively O(1). I also implemented a clean_stale() function (more about this function below) that pops our capped heap. Even in the worst-case scenario, where the function recursively pops every element, since the heap is capped at 100, it still has an O(1) complexity.

`top100() - O(1)`

Since we'd ensure the heap is capped at 100, most of our operations here are O(1):

-   Cloning and Sorting the heap with at most 100 elements is O(1).
-   Building the set with at most 100 elements is O(1)
-   Map lookups are also O(1)

`clear() - O(1)`

Reinitializing the Map and the heap ensures that this operation is always O(1). Eventually, the garbage collector will reclaim the memory from the discarded items.

### How does your code work?

When a request is processed, the `request_handled` function is called with an ip_address as an argument. Based on this argument, the code checks the Map to see if we have previously encountered that IP address:

-   If we haven't done so, we create a new object, store it in the Map, clean up any stale items, and insert the IP as a tuple (address and frequency) into the heap.
-   When we encounter an IP address, we increase its count on the Map, clean up any stale items, and then check if our heap has reached 100 entries. This limit is crucial because it guarantees that all operations performed on the heap maintain a predictable and constant runtime complexity.
    -   If we have less than 100, we insert the IP into the heap after cleaning stale items.
    -   If we have 100 items, we need to check the root. Since this is a min-heap, we can be confident that the root will always contain the lowest item among our top 100. If the IP has a count that exceeds the root's count, it qualifies to be included in the top 100. We will remove the root (ensuring we maintain 100 items), clean up any stale entries, and then add the new IP to the top 100 heap.

**Note: Why do we need to clean stales?** - To simplify the code, we use lazy validation of heap elements, allowing for duplicate IP addresses with different counts. When an item becomes stale due to a higher-frequency duplicate in the tree, we address it. Each time we insert, compare sizes, or pop the tree, we ensure the root is fresh, removing it if necessary until we have a valid root.

![Stale nodes](docs/stale-items.png 'Stale nodes')

The main work is done in the `request_handled` function, where we track all IP addresses and the top 100 most common ones. This ensures that the heap contains only these entries when we call the `top100` function, making sorting and cloning efficient since we handle at most one hundred elements. We use a set to eliminate duplicates and then convert it back to an array for the final output to ensure we return unique IP addresses with their correct frequency counts.

Clearing the data structures is as easy as reinitializing the data structures again.
