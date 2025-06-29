import Chip from '@mui/material/Chip';
import Stack from "@mui/material/Stack";

import Tooltip from '@mui/material/Tooltip';
import HardwareIcon from '@mui/icons-material/Hardware';
export default function SkillSet({Skills}) {
    

    return (
        <Stack direction="row" spacing={1}>          
            { 
                Skills !== undefined && Skills.map((skill) => {
                        return (
                            
                            <Tooltip key={
                                skill
                            } title={<span style={{ fontSize: "14px" }}>Skill: {skill}</span>}>
                                <Chip key="mine" color="default" label={skill} icon={<HardwareIcon />} />
                            </Tooltip>
                            
                        )
                    })
            }            
        </Stack>
    )
}