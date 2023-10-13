<template>
    <div class="container py-3">
        <div class="d-flex">
            <div class="input-group">
                <div class="form-outline d-flex" style="border-radius: 0% !important;">
                    <input type="search" id="form1" class="form-control" placeholder="Search"
                        style="border-top-right-radius: 0px !important; border-bottom-right-radius: 0px; " />
                    <button type="button" class="btn btn-primary"
                        style="border-top-left-radius: 0% !important; border-bottom-left-radius: 0%;">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
            <div class="d-flex">
                <div class="mx-1 ms-2 btn btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">
                    <i class="bi bi-funnel"></i>
                </div>
                <div class="mx-1 btn btn-outline-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExampleOne"
                    aria-controls="offcanvasExampleOne">
                    <i class="bi bi-arrow-down-up"></i>
                </div>
                <RouterLink to="/users/create" class="text-dark">
                    <div class=" mx-1 border border-primary  btn btn-outline-primary">
                        <i class="bi bi-plus-lg " type="button"></i>
                    </div>
                </RouterLink>
            </div>
        </div>
        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"
            style="height:80vh ;">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Filter</h5>
                <div class="d-flex">
                    <button data-bs-dismiss="offcanvas" aria-label="Close"
                        class="btn py-2 px-4 mx-2 btn-light">Clear</button>
                    <button data-bs-dismiss="offcanvas" aria-label="Close"
                        class="btn py-2 px-4 mx-2 btn-light">Apply</button>
                </div>

            </div>
            <div class="offcanvas-body">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item mb-3">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                Enter Rate Range
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="d-flex w-100">
                                    <input type="number" placeholder="Min" class="form-control-sm w-50">--
                                    <input type="number" placeholder="Max" class="form-control-sm w-50">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <select class="form-select py-3 mb-3" aria-label="Default select example">
                    <option selected>Select Department</option>
                    <option value="1">Cutting Department</option>
                    <option value="2">Line Department</option>
                    <option value="3">Finishing Department</option>
                </select>
                <select class="form-select py-3 mb-3" aria-label="Default select example">
                    <option selected>Select Post</option>
                    <option value="1">Manager</option>
                    <option value="2">Manager</option>
                    <option value="3">Manager</option>
                </select>
            </div>
        </div>




        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasExampleOne"
            aria-labelledby="offcanvasExampleLabel" style="height: 55vh;">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Sort</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <div class="w-100">
                        <div class="d-flex flex-column" data-bs-dismiss="offcanvas">
                            <div class="d-flex justify-content-between" v-for="(paragraph, index) in paragraphs"
                                :key="index">
                                <p :style="{ color: paragraphColor(paragraph) }" @click="changeColorAndCheck(paragraph)">
                                    {{ paragraph.text }}
                                </p>
                                <p v-if="paragraph.selected" class="tick-mark"><i class="bi bi-check2"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'OrderFilter',
    data() {
        return {
            paragraphs: [
                { text: 'By Name', selected: false },
                { text: 'By Id', selected: false },
                { text: 'By Rate', selected: false },
                { text: 'By Post', selected: false },
                { text: 'By Department', selected: false }
            ],
            isScrollingDown: false,
            prevScrollPos: window.pageYOffset,
            suppliers: [
                { id: 1, name: 'Supplier 1 Himanshu Bakshi' },
                { id: 2, name: 'Supplier 2 Prince Jain' },
                { id: 3, name: 'Supplier 3 Ashish Agarwal' },
                { id: 4, name: 'All Suppliers' },
            ]
        }
    },
    methods: {
        selectColor(index) {
            if (this.isSelected(index)) {
                const selectedIndex = this.selectedIndexes.indexOf(index);
                this.selectedIndexes.splice(selectedIndex, 1);
            } else {
                this.selectedIndexes.push(index);
            }
        },
        isSelected(index) {
            return this.selectedIndexes.includes(index);
        },

        paragraphColor(paragraph) {
            return paragraph.selected ? 'black' : 'gray';
        },
        changeColorAndCheck(clickedParagraph) {
            for (const paragraph of this.paragraphs) {
                if (paragraph === clickedParagraph) {
                    paragraph.selected = true;
                } else {
                    paragraph.selected = false;
                }
            }
        },
    },
    computed: {
        selectedColorNames() {
            if (this.selectedIndexes.length > 0) {
                return this.selectedIndexes.map(
                    (index) => this.colors[index]
                ).join(", ");
            } else {
                return "No color selected";
            }
        },
    },
}
</script>

<style  scoped>
.selected-color {
    border: 1px solid black;
}

.container {
    transition: transform 0.3s ease-in-out;
}

.hide-on-scroll {
    transform: translateY(-200%);
}

.accordion-button:not(.collapsed) {

    box-shadow: none;
}
</style>



























<!-- ------------------------------------------------------------------------------------------------------------- -->

 