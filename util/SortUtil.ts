class SortUtil {

    // i <3 typescript
    public sort(data: any[], direction: string) {
        switch(direction) {
            case 'ascending':
                return data.sort((a, b) => a.price - b.price);
            case 'descending':
                return data.sort((a, b) => b.price - a.price);
            default:
                return data;
        }

    }

}

export default SortUtil;