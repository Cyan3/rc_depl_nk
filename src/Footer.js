import {useStoreState} from 'easy-peasy'

const Footer = () => {
    const postCount = useStoreState((state) => state.postCount)
    return (
        <footer className='Footer'>
            {postCount === 1?
            <p>{postCount} Blog Post</p> :
            <p>{postCount} Blog Posts</p>}
        </footer>
    )
}
export default Footer