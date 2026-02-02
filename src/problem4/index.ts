// for loop 
// complexity: O(n) 
function sum_to_n_a(n: number): number { 
    let sum = 0 
    for (let i = 1; i <= n; i++) {
        sum = sum + i 
    } 
    return sum 
} 

// recursive 
// complexity: O(n) 
function sum_to_n_b(n: number): number { 
    if (n === 0) return 0
    return n + sum_to_n_b(n - 1) 
} 

// using math formular 
// complexity: O(1) 
function sum_to_n_c(n: number): number { 
    return (n * (n + 1)) / 2
} 
 
console.log('Approach A: ' + sum_to_n_a(5)) 
console.log('Approach B: ' + sum_to_n_b(5))
console.log('Approach C: ' + sum_to_n_c(5))