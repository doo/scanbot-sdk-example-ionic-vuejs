import { useRouter } from 'vue-router';
const router = useRouter();

export class NavigationService {
    public static Test(path: string) {
        alert('hello');
        router.push('/image_preview');
    }
}