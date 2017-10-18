let fi = (function() {
  return {

    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(list, callback, context) {
      if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
          callback.call(context, list[i], i, list)
        }
      } else if (typeof list === 'object') {
        for (var key in list) {
          callback.call(context, key, list[key])
        }
      }
      return list
    },

    map: function(list, callback, context) {
      let mapped = []
      if (Array.isArray(list)) {
        for(let i = 0; i < list.length; i++) {
          let modifiedEle = callback.call(context, list[i], i, list)
          mapped.push(modifiedEle)
        }
      } else if (typeof list === 'object') {
        for (var key in list) {
          let modifiedEle = callback.call(context, list[key], key)
          mapped.push(modifiedEle)
        }
      }
      return mapped
    },

    reduce: function(collection, callback, acc) {
      if (!Array.isArray(collection))
        collection = Object.values(collection)
      
      for (let idx = 0; idx < collection.length; idx++) 
        acc = callback(acc, collection[idx], collection)
      return acc
    },

    find: function(list, findFunction, context) {
      for(let i = 0; i < list.length; i++) {
        if (findFunction.call(context, list[i], i, list)) { return true }
      }
      return false
    },

    filter: function(list, predicateFunc, context) {
      let filtered = []
      for(let i = 0; i < list.length; i++) {
        if (predicateFunc.call(context, list[i], i, list)) { filtered.push(list[i]) }
      }
      return filtered
    },

    sortBy: function(list, criteria, context) {
      if (Array.isArray(list)) { return mergeSort(list) }
      function mergeSort(list) {
        if (list.length < 2) { return list }
        let midPoint = Math.floor(list.length / 2)
        let listLeft = list.slice(0, midPoint)
        let listRight = list.slice(midPoint)
        return merge(mergeSort(listLeft), mergeSort(listRight))
      }

      function merge(left, right) {
        // this solution utilizes merge sort, a recursive sorting algorithm that we will cover more in module 5: https://en.wikipedia.org/wiki/Merge_sort
        let merged = []
        let lidx = 0
        let ridx = 0
        while (lidx < left.length && ridx < right.length) {
          let lCallback, rCallback
          if (typeof criteria !== 'function') {
            lCallback = left[lidx][criteria]
            rCallback = right[ridx][criteria]
          } else if (typeof criteria === 'function') {
            lCallback = criteria.call(context, left[lidx])
            rCallback = criteria.call(context, right[ridx])
          }
          if (lCallback < rCallback) {
            merged.push(left[lidx])
            lidx++
          } else {
            merged.push(right[ridx])
            ridx++
          }
        }
        return merged.concat(left.slice(lidx)).concat(right.slice(ridx))
      }
    },

    size: function(list) {
      if (Array.isArray(list)) { return list.length }
      let size = 0
      for (var key in list) { size++ }
      return size
    },

    first: function(array, idx) {
      return (idx) ? array.slice(0, idx) : array[0]
    },

    last: function(array, idx) {
      return (idx) ? array.slice(array.length - idx) : array[array.length-1]
    },

    compact: function(array) {
      let compacted = []
      for (let i = 0; i < array.length; i++) {
        if (array[i]) { compacted.push(array[i]) }
      }
      return compacted
    },

    flatten: function(array, shallow) {
      if (shallow) {
        return [].concat.apply([], array);
      } else {
        // this uses a recursive funciton; for more on recursion see: https://www.youtube.com/watch?v=Mv9NEXX1VHc
        let flattened = []
        for (let i = 0; i < array.length; i++) {
          let element = array[i]
          if (Array.isArray(element)) {
            flattened.push(...this.flatten(element, shallow))
          } else {
            flattened.push(element)
          }
        }
        return flattened
      }
    },

    uniqSorted: function(arr) {
      const newArr = []
      let lastVal = null
      for (let idx = 0; idx < arr.length; idx++) {
        if (arr[idx] !== lastVal) {
          newArr.push(arr[idx])
          lastVal = arr[idx]
        }
      }
      return newArr
    },

    uniq: function(array, isSorted=false, callback=false) {
      const newArr = (callback) ? array.map(x => callback(x)) : array.slice()
      return (isSorted) ? fi.uniqSorted(newArr) : Array.from(new Set(newArr))
    },

    bind: function(fn, obj, args) {
      let boundObj = Object.assign({}, obj)
      boundObj.fn = fn
      return function() {
        return boundObj.fn(args)
      }
    },

    keys: function(obj) {
      let keys = []
      for (let key in obj) {
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      let vals = []
      for (let key in obj) {
        vals.push(obj[key])
      }
      return vals
    },

    functions: function(obj) {
      return Object.getOwnPropertyNames(obj)
    },

  }
})()
