<template>
    <div class="container">
        <div class=" mt-3">
            <div class="border p-2 py-3  text-white w-100 rounded-top" data-bs-toggle="collapse"
                data-bs-target="#procurement" aria-expanded="false" aria-controls="procurement"
                style="background-color: #28CC9E;">
                Fabric Procurement
            </div>
        </div>
        <div class="collapse" :class="{ show: isCollapseVisible }" id="procurement">
            <div class="table-responsive">
                <table class="table table-sm table-borderless ">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">Colors</th>
                            <th scope="col" class="text-center">Pcs</th>
                            <th scope="col" class="text-center">Length</th>
                            <th scope="col" class="text-center">Width</th>
                        </tr>
                    </thead>
                    <tbody v-for="(fabric, index) in manager.fabrics" :key="index">
                        <tr>
                            <th colspan="3">{{ fabric.name }} {{ fabric.fabricCode }}</th>
                            <td class="text-center"><button class="btn btn-sm"><i
                                        class="bi bi-arrow-down-short"></i></button></td>
                        </tr>
                        <tr v-for="(color, colorIndex) in fabric.colors" :key="colorIndex">
                            <td class="align-items-center justify-content-center d-flex">
                                <div class="rounded-circle " style="width: 30px; height: 30px;"
                                    :style="'background-color :' + color.bg"></div>
                            </td>
                            <td><input type="number" class="form-control form-control-sm  text-center"
                                    :value="calculateFabricQty(color)" readonly></td>
                            <td><input type="number" class="form-control form-control-sm  text-center"
                                    v-model="color.length"></td>
                            <td><input type="number" class="form-control form-control-sm  text-center"
                                    v-model="color.width"></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td>
                                Total Pieces
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                {{ calculateTotalPieces() }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex flex-column">
                    <button class="btn btn-dark" :disabled="!isLinkClicked"
                        @click="toggleCollapseAndShowFabricCutting">Accept
                        Order</button>
                    <span>Will became active once Fabric store disptach the required Fabric</span>
                    <p class="mb-0"><a @click="enableButton">[Link]</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['manager'],
    data() {
        return {
            isLinkClicked: false,
            isCollapseVisible: true,
        };
    },
    methods: {
        calculateFabricQty(color) {
            if (color.fcpu === 0) return 0; // Avoid division by zero
            return Math.round(color.length / color.fcpu);
        },
        // calculateFabricQty(color) {
        //     if (color.fcpu === 0) return 0; // Avoid division by zero
        //     return color.length / color.fcpu ;
        // },
        calculateTotalPieces() {
            let total = 0;
            for (const fabric of this.manager.fabrics) {
                for (const color of fabric.colors) {
                    total += this.calculateFabricQty(color);
                }
            }
            return total;
        },
        enableButton() {
            this.isLinkClicked = true;
        },
        // collapseAndShowFabricCutting() {
        //     this.isLinkClicked = true;
        //     this.$emit('showFabricCutting'); // Emit the event to parent
        // },
        toggleCollapseAndShowFabricCutting() {
            this.isLinkClicked = true;
            this.isCollapseVisible = !this.isCollapseVisible;
            this.$emit('showFabricCutting'); // Emit the event to parent
        },
    }
}
</script>

<style lang="scss" scoped></style>