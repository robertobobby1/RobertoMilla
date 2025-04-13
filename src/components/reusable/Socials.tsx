import { Github, Linkedin } from 'lucide-react';

const Socials = () => {
    const openLink = url => {
        window.open(url, '_blank');
    };
    const classes = 'text-xs text-muted-foreground hover:cursor-pointer hover:text-primary';
    return (
        <div className="flex space-x-4 mt-4 md:mt-0">
            <Github
                className={classes}
                onClick={() => {
                    openLink('https://github.com/robertobobby1');
                }}
            />
            <Linkedin
                className={classes}
                onClick={() => {
                    openLink('https://www.linkedin.com/in/roberto-milla-martinez-654006150/');
                }}
            />
        </div>
    );
};

export default Socials;
