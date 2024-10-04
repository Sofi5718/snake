export class Queue {
    head = null;
    tail = null;

    count = 0;

    constructor() {}

    enQueue(data) {
        const newNode = new Node(data, null);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }

    deQueue() {
        if (this.head === null) {
            return null;
        }
        const currentHead = this.head.data;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        }
        this.count--;
        return currentHead;
    }

    peek() {
        return this.head;
    }

    size() {
        return this.count;
    }

    get(index) {
        if (index < 0 || index >= this.count) {
            return null;
        }
        let lookAt = this.head;
        let i = 0;
        while (lookAt !== null) {
            if (i == index) {
                return lookAt.data;
            }
            lookAt = lookAt.next;
            i++;
        }
        return null;
    }
}

class Node {
    next = null;
    data = null;

    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}
