import React, { useState } from "react";
import { Play, BookOpen, ChevronDown, ChevronRight, Award } from "lucide-react";

const DSAVideoPage = () => {
 // Load initial state from localStorage
  const [currentVideo, setCurrentVideo] = useState(() => {
    const saved = localStorage.getItem('currentVideo');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [checkedVideos, setCheckedVideos] = useState(() => {
    const saved = localStorage.getItem('checkedVideos');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [openedSection, setOpenedSection] = useState(() => {
    const saved = localStorage.getItem('openedSection');
    return saved ? JSON.parse(saved) : 0;
  });

  // =====================================================
  // Complete DSA Topics with Videos
  // =====================================================
  const dsaSections = [
    // {
    //   title: "Introduction to DSA",
    //   videos: [
    //     { title: "What is DSA?", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Why Data Structures Matter?", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Algorithm Analysis Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Big O Notation", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Time and Space Complexity", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },

    // {
    //   title: "Arrays",
    //   videos: [
    //     { title: "Array Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Array Operations", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "2D Arrays", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Array Searching", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Array Sorting", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Array Problems - Easy", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Array Problems - Medium", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Array Problems - Hard", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    {
      title: "Sorting Algorithms",
      videos: [
        { title: "Bubble Sort", url: "https://www.youtube.com/embed/-FQ_dsLILoM?si=bem-OeP7Bw2a1qQO" },
        { title: "Selection Sort", url: "https://www.youtube.com/embed/0WV26hOnIIs?si=043fWZ5tCwwqknPl" },
        { title: "Insertion Sort", url: "https://www.youtube.com/embed/4uM9ehokz6I?si=x0RQ4qnEXlljckyU" },
        { title: "Merge Sort", url: "https://www.youtube.com/embed/xQiK3CKBOAo?si=oFGz4klJZ7Y74ZR0" },
        { title: "Quick Sort", url: "https://www.youtube.com/embed/6y8du-_iP8o?si=8TLkbqisiYq6iB-G" },
        //{ title: "Heap Sort", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
        //{ title: "Counting Sort", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
        //{ title: "Radix Sort", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
        //{ title: "Bucket Sort", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
      ]
    }
    // {
    //   title: "Strings",
    //   videos: [
    //     { title: "String Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "String Manipulation", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Pattern Matching", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "String Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Linked Lists",
    //   videos: [
    //     { title: "Introduction to Linked Lists", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Singly Linked List", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Doubly Linked List", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Circular Linked List", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Linked List Operations", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Reverse a Linked List", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Detect Loop in Linked List", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Linked List Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Stacks",
    //   videos: [
    //     { title: "Stack Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Stack Implementation", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Infix to Postfix", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Next Greater Element", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Stack Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Queues",
    //   videos: [
    //     { title: "Queue Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Queue Implementation", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Circular Queue", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Priority Queue", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Deque (Double Ended Queue)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Queue Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Recursion",
    //   videos: [
    //     { title: "Recursion Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Recursion vs Iteration", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Tail Recursion", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Backtracking Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Recursion Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Searching Algorithms",
    //   videos: [
    //     { title: "Linear Search", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Binary Search", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Binary Search Variations", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Ternary Search", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Searching Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    
    // {
    //   title: "Hashing",
    //   videos: [
    //     { title: "Hash Table Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Hash Functions", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Collision Handling", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "HashMap vs HashSet", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Hashing Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Trees",
    //   videos: [
    //     { title: "Tree Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Binary Tree", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Binary Search Tree (BST)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Tree Traversals - Inorder", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Tree Traversals - Preorder", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Tree Traversals - Postorder", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Level Order Traversal", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Height of Tree", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Diameter of Tree", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Tree Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Advanced Trees",
    //   videos: [
    //     { title: "AVL Trees", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Red-Black Trees", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "B-Trees", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Segment Trees", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Fenwick Tree (BIT)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Trie (Prefix Tree)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Suffix Tree", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Heaps",
    //   videos: [
    //     { title: "Heap Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Max Heap", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Min Heap", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Heap Operations", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Priority Queue using Heap", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Heap Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Graphs",
    //   videos: [
    //     { title: "Graph Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Graph Representation", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "BFS (Breadth First Search)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "DFS (Depth First Search)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Cycle Detection", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Topological Sort", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Connected Components", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Shortest Path - Dijkstra", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Shortest Path - Bellman Ford", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Floyd Warshall Algorithm", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Minimum Spanning Tree - Prim's", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Minimum Spanning Tree - Kruskal's", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Graph Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Dynamic Programming",
    //   videos: [
    //     { title: "DP Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Memoization vs Tabulation", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Fibonacci with DP", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "0/1 Knapsack", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Longest Common Subsequence", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Longest Increasing Subsequence", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Edit Distance", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Matrix Chain Multiplication", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Coin Change Problem", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Subset Sum Problem", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "DP on Trees", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "DP on Grids", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Advanced DP Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Greedy Algorithms",
    //   videos: [
    //     { title: "Greedy Method Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Activity Selection", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Fractional Knapsack", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Job Sequencing", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Huffman Coding", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Greedy Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Backtracking",
    //   videos: [
    //     { title: "Backtracking Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "N-Queens Problem", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Sudoku Solver", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Rat in a Maze", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Permutations", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Combinations", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Backtracking Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Divide and Conquer",
    //   videos: [
    //     { title: "Divide and Conquer Introduction", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Binary Search Revisited", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Merge Sort Revisited", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Quick Sort Revisited", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Strassen's Matrix Multiplication", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Closest Pair of Points", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Bit Manipulation",
    //   videos: [
    //     { title: "Bitwise Operators", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Bit Manipulation Tricks", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Count Set Bits", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Power of Two", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "XOR Properties", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Bit Manipulation Problems", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Advanced Topics",
    //   videos: [
    //     { title: "Disjoint Set Union (DSU)", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Union Find Algorithm", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Sliding Window Technique", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Two Pointer Technique", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "KMP Algorithm", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Rabin Karp Algorithm", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Z Algorithm", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Manacher's Algorithm", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Problem Solving Patterns",
    //   videos: [
    //     { title: "Frequency Counter Pattern", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Multiple Pointers Pattern", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Sliding Window Pattern", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Divide and Conquer Pattern", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Dynamic Programming Patterns", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // },
    // {
    //   title: "Interview Preparation",
    //   videos: [
    //     { title: "Top Array Questions", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Top String Questions", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Top Tree Questions", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Top Graph Questions", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Top DP Questions", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "System Design Basics", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" },
    //     { title: "Mock Interviews", url: "https://www.youtube.com/embed/YOUR_VIDEO_ID" }
    //   ]
    // }
  ];



    React.useEffect(() => {
    localStorage.setItem('currentVideo', JSON.stringify(currentVideo));
  }, [currentVideo]);

  React.useEffect(() => {
    localStorage.setItem('checkedVideos', JSON.stringify(checkedVideos));
  }, [checkedVideos]);

  React.useEffect(() => {
    localStorage.setItem('openedSection', JSON.stringify(openedSection));
  }, [openedSection]);
  
  // =====================================================
  // Calculate Progress
  // =====================================================
  const totalVideos = dsaSections.reduce((sum, section) => sum + section.videos.length, 0);
  const completedVideos = Object.values(checkedVideos).filter(Boolean).length;
  const progressPercentage = Math.round((completedVideos / totalVideos) * 100);

  // =====================================================
  // Handle checkbox click
  // =====================================================
  const toggleCheckbox = (sectionIndex, videoIndex) => {
    const key = `${sectionIndex}-${videoIndex}`;
    setCheckedVideos(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3 text-indigo-900">
            <BookOpen className="text-indigo-600" size={40} />
            Complete DSA Using Python Language
          </h1>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Award className="text-yellow-500" />
              <span>{completedVideos}/{totalVideos} ({progressPercentage}%)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side — Video List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg max-h-[700px] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Topics & Videos</h2>
            
            {dsaSections.map((section, sectionIndex) => {
              const sectionCompleted = section.videos.filter((_, videoIndex) => 
                checkedVideos[`${sectionIndex}-${videoIndex}`]
              ).length;
              
              return (
                <div key={sectionIndex} className="mb-4 border-b border-gray-200 pb-3">
                  <button
                    className="w-full flex justify-between items-center text-lg font-semibold mb-2 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-indigo-50"
                    onClick={() =>
                      setOpenedSection(openedSection === sectionIndex ? null : sectionIndex)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span>{section.title}</span>
                      <span className="text-sm text-gray-500">
                        ({sectionCompleted}/{section.videos.length})
                      </span>
                    </div>
                    {openedSection === sectionIndex ? 
                      <ChevronDown className="text-indigo-600" /> : 
                      <ChevronRight className="text-gray-400" />
                    }
                  </button>

                  {openedSection === sectionIndex && (
                    <div className="pl-4 space-y-2">
                      {section.videos.map((video, videoIndex) => {
                        const key = `${sectionIndex}-${videoIndex}`;
                        const isChecked = checkedVideos[key] || false;

                        return (
                          <div
                            key={videoIndex}
                            className={`flex justify-between items-center p-3 rounded-lg shadow-sm transition-all ${
                              isChecked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            <div
                              className="flex items-center gap-3 cursor-pointer flex-1"
                              onClick={() => setCurrentVideo(video)}
                            >
                              <Play size={18} className="text-indigo-600 flex-shrink-0" />
                              <span className={isChecked ? 'line-through text-gray-500' : ''}>{video.title}</span>
                            </div>

                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleCheckbox(sectionIndex, videoIndex)}
                              className="w-5 h-5 cursor-pointer accent-green-600"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side — Video Player */}
          <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col sticky top-6 h-fit">
            {currentVideo ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  {currentVideo.title}
                </h2>
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    src={currentVideo.url}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Enjoy your learning journey!

                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <Play size={64} className="text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 text-center">
                  Select a video to start learning
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Click on any video from the left panel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAVideoPage;





