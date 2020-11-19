<template>
    <div class="simulador">
        <div class="container">
            <h1>Administrador</h1>
            <h3 class="pb-5 subtitle">Burger Bar</h3>
            <h1 class="pb-5">Simulador</h1>
            <form @submit.prevent="calcLucro()">
                <div class="form-group">
                    <label class="float-left" for="precoCobrado">Preço Cobrado (R$):</label>
                    <input class="form-control w-100" type="number" id="precoCobrado" v-model="precoCobrado" autocomplete="off" required>
                </div>
                <div class="form-group">
                    <label class="float-left" for="custoReal">Custo Real (R$):</label>
                    <input class="form-control w-100" type="number" id="custoReal" v-model="custoReal" autocomplete="off" required>
                </div>
                <button type="submit" class="btn btn-block btn-primary mb-3">Calcular Lucro</button>
            </form>
            <form @submit.prevent="calcReducao()">
                <div class="form-group">
                    <label class="float-left" for="lucroAtual">Lucro Atual (R$):</label>
                    <input class="form-control w-100" type="number" id="lucroAtual" v-model="lucroAtual" autocomplete="off" readonly>
                </div>
                <div class="form-group">
                    <label class="float-left" for="lucroAceitavel">Lucro Aceitável pela Venda:</label>
                    <input class="form-control w-100" type="range" min="0" :max="this.lucroAtual" v-model="lucroAceitavel" autocomplete="off" :disabled="!showResultLucro">
                    <div class="text-center"><b>R${{lucroAceitavel}}</b></div>
                </div>
                <button type="submit" class="btn btn-block btn-primary mb-3">Calcular Redução</button>
            </form>
            <div class="m-5 div-result" v-if="showResultReducao">
                <div>Para cada mínimo de <b>R${{precoCobrado}}</b> em vendas, será ofertado <b>1 ponto</b>.</div>
                <div>Sendo <b>1 ponto</b> equivalente a <b>R${{reducao}}</b>.</div>
            </div>
            <router-link to="/home-admin"><button class="btn btn-block btn-tertiary mb-3">Voltar</button></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Simulator',
        data() {
            return {
                precoCobrado: undefined,
                custoReal: undefined,
                lucroAtual: undefined,
                lucroAceitavel: 0,
                reducao: undefined,
                showResultLucro: false,
                showResultReducao: false
            }
        },
        methods: {
            calcLucro() {
                this.lucroAtual = this.precoCobrado - this.custoReal
                this.showResultLucro = true
            },
            calcReducao() {
                if (this.showResultLucro) {
                    this.reducao = this.lucroAtual - this.lucroAceitavel
                    this.showResultReducao = true
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .div-result {
        padding: 40px;
        background-color: lightgoldenrodyellow;
        border: 2px solid #0C326F;
    }
</style>