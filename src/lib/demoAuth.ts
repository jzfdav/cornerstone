// Demo credentials - hashed for security
// These are validated client-side until Supabase is configured

// Simple hash function using Web Crypto API
async function hashCode(input: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(input.toLowerCase().trim())
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Pre-computed SHA-256 hashes
const PROJECT_CODE_HASH = 'bf28519cc7e8d58009bfad29efac71219be43f135b61ebee09d68176884d099d'

// Login codes = spouse names (SHA-256 hashes)
// User enters their spouse's name to login
const LOGIN_CODE_HASHES: Record<string, { displayName: string; spouseName: string; role: 'admin' | 'member' }> = {
    // "ansu" -> Joseph logs in with spouse name Ansu
    '1abe5da90451ad357c62a5d200aa5165a742a8e6af8e5b3b46eca3411f560281': {
        displayName: 'Joseph',
        spouseName: 'Ansu',
        role: 'admin'
    },
    // "tessy" -> Mohan logs in with spouse name Tessy
    '0c581c997a25945b00bc3e29a0889e2e9dbd9169e0724c4caf0241821a71adac': {
        displayName: 'Mohan',
        spouseName: 'Tessy',
        role: 'member'
    },
    // "mohan" -> Tessy (Mom) logs in with spouse name Mohan
    'b8f067f3af4cd1674f5949b81a4eeca88bfa433da391ffcea203b1270d619c80': {
        displayName: 'Tessy',
        spouseName: 'Mohan',
        role: 'member'
    },
    // "joseph" -> Ansu logs in with spouse name Joseph
    '7ee8118150e0ce023742beba6f10bf23aabbf0bc2c182f36fd1a6753cd21b4c6': {
        displayName: 'Ansu',
        spouseName: 'Joseph',
        role: 'member'
    }
}

// Project name (shown after login)
const PROJECT_NAME = 'Purva Tivoli Hills'

export interface DemoUser {
    id: string
    project_id: string
    access_code: string
    displayName: string
    display_name: string
    spouse_name: string
    role: 'admin' | 'member'
    created_at: string
}

export interface DemoProject {
    id: string
    code: string
    name: string
    created_at: string
}

export async function validateDemoProjectCode(code: string): Promise<DemoProject | null> {
    const inputHash = await hashCode(code)

    if (inputHash === PROJECT_CODE_HASH) {
        return {
            id: 'demo-project',
            code: code.toUpperCase(),
            name: PROJECT_NAME,
            created_at: new Date().toISOString()
        }
    }

    return null
}

export async function validateDemoLoginCode(loginCode: string, projectId: string): Promise<DemoUser | null> {
    const inputHash = await hashCode(loginCode)

    const userData = LOGIN_CODE_HASHES[inputHash]
    if (userData) {
        return {
            id: `demo-user-${userData.displayName.toLowerCase()}`,
            project_id: projectId,
            access_code: inputHash.substring(0, 8), // Don't expose actual code
            displayName: userData.displayName,
            display_name: userData.displayName,
            spouse_name: userData.spouseName,
            role: userData.role,
            created_at: new Date().toISOString()
        }
    }

    return null
}
