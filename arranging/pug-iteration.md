반복문 (Iteration)

```
html
    head
    body
        - const items = ['1', '2', '3']
        for item in items
            p= item

// 1
// 2
// 3
        - const arrays = [
        {'task':'todo1', 'date':'2018-6-3'},
        {'task':'todo2', 'date':'2018-6-2'}]
        for array in arrays
            p= array.task + ', ' + array.date

// todo1, 2018-6-3
// todo2, 2018-6-2
```