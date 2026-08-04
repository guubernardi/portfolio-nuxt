<script setup lang="ts">
import { useHead } from 'nuxt/app';
import SectionCurriculo from '../../components/pages/curriculo/SectionCurriculo.vue';

useHead({
    title: 'Currículo',
    meta: [
        {
            name: 'description',
            content:
                'Currículo de Gustavo Bernardi — desenvolvedor web. Experiência, stack e formação.'
        },
        // fora da busca de propósito, igual à /bio: o site vende serviço de
        // desenvolvimento, e um currículo pessoal indexado puxa a leitura do
        // Google de volta para "portfólio de candidato". O link segue aberto
        // para envio direto.
        { name: 'robots', content: 'noindex, follow' }
    ]
})
</script>

<template>
    <SectionCurriculo/>
</template>
