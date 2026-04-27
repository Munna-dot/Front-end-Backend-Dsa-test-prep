// 10 Basic JavaScript Algorithm Practice Programs

// ============================================================
// Problem 1: FizzBuzz
// 1 se n tak numbers print karo. 3 ke multiples ke liye number ki jagah "Fizz" print karo.
// 5 ke multiples ke liye "Buzz" print karo. 3 aur 5 dono ke multiples ke liye "FizzBuzz" print karo.
// Solution: Numbers ko iterate karo aur modulo operator (%) use karke check karo ki number
// 3, 5, ya dono se divide hota hai ya nahi.
// ============================================================
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i);
    }
  }
  return result;
}

// Test: fizzBuzz(15)
// Expected: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]


// ============================================================
// Problem 2: Reverse a String
// Diye gaye string ko reverse karo bina built-in reverse methods use kiye.
// Solution: String ko array mein convert karo, peeche se iterate karo, aur join karo.
// Alternative: Two pointers use karke characters ko swap karo.
// ============================================================
function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Test: reverseString("hello")
// Expected: "olleh"


// ============================================================
// Problem 3: Find Maximum Number in Array
// Numbers ke array se maximum value dhundo.
// Solution: Max ko pehle element se initialize karo, array ko iterate karte raho
// aur max ko update karo jab koi bada value mile.
// ============================================================
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Test: findMax([3, 7, 2, 9, 1, 5])
// Expected: 9


// ============================================================
// Problem 4: Check if String is Palindrome
// Palindrome woh string hai jo aage aur peeche se same padhi jati hai (jaise "racecar").
// Solution: Two pointers use karo, ek start pe aur ek end pe,
// characters ko compare karte hue center ki taraf badho.
// ============================================================
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Test: isPalindrome("racecar"), isPalindrome("hello")
// Expected: true, false


// ============================================================
// Problem 5: Count Vowels in a String
// Diye gaye string mein vowels (a, e, i, o, u) ki ginti karo.
// Solution: Har character ko iterate karo, check karo ki vowel hai
// ya nahi using set ya conditional, aur counter badhao.
// ============================================================
function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

// Test: countVowels("Hello World")
// Expected: 3


// ============================================================
// Problem 6: Calculate Factorial
// Non-negative integer n ka factorial calculate karo (n!).
// Factorial n se chote ya barabar sabhi positive integers ka product hai (jaise 5! = 5×4×3×2×1 = 120).
// Solution: Iterative approach use karo 1 se n tak numbers ko multiply karte hue.
// ============================================================
function factorial(n) {
  if (n < 0) return null; // Negative numbers ke liye factorial define nahi hai
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Test: factorial(5)
// Expected: 120


// ============================================================
// Problem 7: Generate Fibonacci Sequence
// nth Fibonacci number generate karo jahan F(0)=0, F(1)=1,
// aur F(n) = F(n-1) + F(n-2) for n > 1.
// Solution: Iterative approach use karo sirf last two values store karke
// recursion overhead aur exponential time complexity se bachne ke liye.
// ============================================================
function fibonacci(n) {
  if (n < 0) return null;
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    let next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}

// Test: fibonacci(10)
// Expected: 55


// ============================================================
// Problem 8: Remove Duplicates from Array
// Array diya gaya hai, duplicate values hata kar naya array return karo.
// Solution: Set use karo seen elements track karne ke liye, ya filter use karo
// indexOf ke saath har element ki sirf pehli occurrence rakhne ke liye.
// ============================================================
function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];
  for (let item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

// Test: removeDuplicates([1, 2, 2, 3, 4, 4, 5])
// Expected: [1, 2, 3, 4, 5]


// ============================================================
// Problem 9: Two Sum
// Integers ke array aur target sum diya gaya hai, do numbers dhundo
// jo target mein add ho jate hain. Unke indices return karo.
// Solution: Hash map use karo complement (target - current) store karne ke liye
// aur uska index. Har element ke liye, check karo ki uska complement exist karta hai ya nahi.
// ============================================================
function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
  return null; // Koi solution nahi mila
}

// Test: twoSum([2, 7, 11, 15], 9)
// Expected: [0, 1] (kyunki arr[0] + arr[1] = 2 + 7 = 9)


// ============================================================
// Problem 10: Binary Search
// Sorted array aur target value diya gaya hai, target ka index dhundo.
// Agar na mile to -1 return karo.
// Solution: Divide-and-conquer use karo. Target ko middle element se compare karo,
// search space ka aadha hissa eliminate karo, bache hue adhe hisse pe repeat karo.
// Time Complexity: O(log n)
// ============================================================
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Target nahi mila
}

// Test: binarySearch([1, 3, 5, 7, 9, 11], 7)
// Expected: 3


// ============================================================
// Saare tests run karo solutions ko verify karne ke liye
// ============================================================
console.log("=== Algorithm Practice Results ===\n");

console.log("1. FizzBuzz(15):");
console.log(fizzBuzz(15));

console.log("\n2. Reverse String('hello'):");
console.log(reverseString("hello"));

console.log("\n3. Find Max([3, 7, 2, 9, 1, 5]):");
console.log(findMax([3, 7, 2, 9, 1, 5]));

console.log("\n4. Is Palindrome('racecar'):");
console.log(isPalindrome("racecar"));

console.log("\n5. Count Vowels('Hello World'):");
console.log(countVowels("Hello World"));

console.log("\n6. Factorial(5):");
console.log(factorial(5));

console.log("\n7. Fibonacci(10):");
console.log(fibonacci(10));

console.log("\n8. Remove Duplicates([1, 2, 2, 3, 4, 4, 5]):");
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));

console.log("\n9. Two Sum([2, 7, 11, 15], 9):");
console.log(twoSum([2, 7, 11, 15], 9));

console.log("\n10. Binary Search([1, 3, 5, 7, 9, 11], 7):");
console.log(binarySearch([1, 3, 5, 7, 9, 11], 7));

console.log("\n=== All Tests Complete ===");
