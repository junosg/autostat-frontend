<template>
    <section class="flex flex-col items-center justify-end pb-40 w-full">
        <div class="text-red-400 text-5xl">Privacy Policy</div>
        <div class="text-gray-500 font-mono text-justify my-4" :class="textSizeClass">
            This Privacy Policy explains how autostat ("we," "us," or "our") handles user data when you visit our website and interact with Google AdSense advertisements. Please read this policy carefully to understand how your information is used.
        </div>
        <div class="text-gray-500 font-mono text-justify grid grid-cols-1 gap-2" :class="textSizeClass">
            <div class="text-red-400 text-2xl">1. Google AdSense</div>
            <div>
                Our website uses Google AdSense to display third-party advertisements. Google AdSense may use cookies and similar tracking technologies to serve ads based on your browsing history. These cookies do not contain personal information, and we do not have access to any data collected by Google AdSense.
            </div>
            <div>
                To learn more about how Google AdSense uses cookies and how to opt out of personalized advertising, please visit the Google AdSense Privacy Policy.
            </div>
            <div class="text-red-400 text-2xl">2. Data Collection</div>
            <div>
                We do not collect or store any personal information from our website visitors. We do not require you to provide any personal information to access our content.
            </div>
            <div class="text-red-400 text-2xl">3. Third-Party Links</div>
            <div>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of these websites before providing any personal information.
            </div>
            <div class="text-red-400 text-2xl">4. Changes to this Privacy Policy</div>
            <div>
                We may update this Privacy Policy to reflect changes in our practices or for legal and regulatory reasons. Any updates will be posted on this page, and the date at the top will indicate the latest revision.
            </div>
        </div>
        <div class="p-8">
            <ElButton size="large"><span class="text-2xl text-red-400 font-mono" @click="router.push({path: '/comparison'})">Get started</span></ElButton>
        </div>
    </section>
</template>
<script setup lang="ts">
    definePageMeta({
        title: 'About',
        description: 'A no-cost statistical tool that autonomously determines the fitting test according to the supplied data. Its objective is to assist researchers in swiftly obtaining results for uncomplicated statistical analyses, and it is accessible even to those without prior knowledge of statistics.'
    });

    const router = useRouter();
    const device = useDevice();
    const textSizeClass = ref("text-lg");

    onMounted(() => {
        if (device.isMobileOrTablet) {
            textSizeClass.value = "text-md";
        }
    });
</script>