#include <stdio.h>

typedef struct s_queue
{
    char    *data;
    int        size;
    int        head;
    int        tail;
}    t_queue;

void    init_queue(t_queue *q, char *buffer, int size)
{
    q->data = buffer;
    q->size = size;
    q->head = 0;
    q->tail = 0;
}

int    is_full(t_queue *q)
{
    return (((q->tail + 1) % q->size) == q->head);
}

int    is_empty(t_queue *q)
{
    return (q->head == q->tail);
}

void    push(t_queue *q, char value)
{
    if (is_full(q))
        return ;
    q->data[q->tail] = value;
    q->tail = (q->tail + 1) % q->size;
}

int    pop(t_queue *q, char *out)
{
    if (is_empty(q))
        return (0);
    *out = q->data[q->head];
    q->head = (q->head + 1) % q->size;
    return (1);
}

void    print_queue(t_queue *q)
{
    int    i;

    i = 0;
    while (i < q->size)
    {
        printf("[%d] %c\n", i, q->data[i]);
        i++;
    }
    printf("head=%d tail=%d\n", q->head, q->tail);
    printf("empty=%d full=%d\n", is_empty(q), is_full(q));
}

int    main(void)
{
    char    buffer[5];
    t_queue    q;
    char    out;
    int        i;

    i = 0;
    while (i < 5)
    {
        buffer[i] = '_';
        i++;
    }
    init_queue(&q, buffer, 5);

    push(&q, 'a');
    push(&q, 'b');
    push(&q, 'c');
    push(&q, 'd');

    print_queue(&q);

    while (pop(&q, &out))
        printf("pop = %c\n", out);

    printf("after pop all\n");
    print_queue(&q);

    return (0);
}
